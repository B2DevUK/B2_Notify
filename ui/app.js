new Vue({
    el: '#app',
    data() {
        return {
            notifications: [],
            config: null,
            debug: false
        };
    },
    methods: {
        addNotification(messageType, message, position = 'top-right') {
            const id = Date.now();
            const config = this.getConfig(messageType);
            const notificationStyle = this.config.notificationStyle || 'normal';
            if (this.debug) {
                console.log('Adding notification:', messageType, message, position);
                console.log('Using config:', config);
            }
            if (config.sound) {
                const audio = new Audio(config.sound);
                audio.volume = 0.5;
                audio.play();
            }
            const notification = { id, message, position, progress: 100, style: `notification-${notificationStyle}`, ...config };
            this.notifications.push(notification);
            const interval = setInterval(() => {
                const index = this.notifications.findIndex(n => n.id === id);
                if (index !== -1 && this.notifications[index].progress > 0) {
                    if (notificationStyle !== 'minimalistic') {
                        this.$set(this.notifications[index], 'progress', this.notifications[index].progress - 2);
                        console.log(`Updated progress for notification ${id}:`, this.notifications[index].progress);
                    }
                } else {
                    clearInterval(interval);
                    this.removeNotification(id);
                }
            }, config.displayTime / 50);
        },
        removeNotification(id) {
            this.notifications = this.notifications.filter(notification => notification.id !== id);
        },
        getConfig(messageType) {
            const defaultConfig = {
                bgColor: 'bg-gray-800',
                barColor: 'bg-gray-500',
                textColor: 'text-white',
                icon: 'ℹ️',
                displayTime: 5000,
                title: '',
                image: '',
                sound: ''
            };
            if (!this.config || !this.config.notificationTypes) {
                return defaultConfig;
            }
            const typeConfig = this.config.notificationTypes[messageType];
            if (!typeConfig) {
                return defaultConfig;
            }
            return {
                bgColor: typeConfig.bgColor || defaultConfig.bgColor,
                barColor: typeConfig.barColor || defaultConfig.barColor,
                textColor: typeConfig.textColor || defaultConfig.textColor,
                icon: typeConfig.icon || defaultConfig.icon,
                displayTime: this.config.displayTime || defaultConfig.displayTime,
                title: typeConfig.title || defaultConfig.title,
                image: typeConfig.image || defaultConfig.image,
                sound: typeConfig.sound || defaultConfig.sound
            };
        },
        progressBarStyle(notification) {
            if (notification.style === 'notification-minimalistic') return { display: 'none' };
            return {
                width: `${notification.progress}%`,
                backgroundColor: this.getTailwindColor(notification.barColor) || 'rgba(0, 0, 0, 0.5)'
            };
        },
        getTailwindColor(tailwindClass) {
            const colorMap = {
                'bg-blue-500': '#3B82F6',
                'bg-green-500': '#10B981',
                'bg-yellow-500': '#F59E0B',
                'bg-red-500': '#EF4444',
                'bg-gray-500': '#6B7280'
            };
            return colorMap[tailwindClass] || null;
        },
    },
    created() {
        window.addEventListener('message', event => {
            if (event.data.type === 'notification') {
                this.addNotification(event.data.messageType, event.data.message, event.data.position);
            } else if (event.data.type === 'config') {
                if (this.debug) {
                    console.log('Raw config received:', event.data.config);
                }
                try {
                    const parsedConfig = JSON.parse(event.data.config);
                    if (this.debug) {
                        console.log('Parsed config:', parsedConfig);
                    }
                    this.$set(this, 'config', parsedConfig);
                    this.debug = parsedConfig.Debug || false;
                    if (this.debug) {
                        console.log('Config set:', this.config);
                    }
                } catch (error) {
                    console.error('Error parsing config:', error);
                }
            }
        });
    },
    template: `
    <div>
        <div v-for="position in ['top', 'top-right', 'top-left', 'center', 'center-left', 'center-right', 'bottom', 'bottom-right', 'bottom-left']" :key="position" :class="['notification-container', position]">
            <transition-group name="list" tag="div">
                <div v-for="notification in notifications.filter(n => n.position === position)" :key="notification.id" :class="['notification', notification.style, notification.bgColor, notification.textColor]">
                    <div :class="['bar', notification.barColor]" v-if="notification.style !== 'notification-minimalistic'"></div>
                    <div class="notification-content">
                        <div class="flex items-center mb-1">
                            <span v-if="notification.icon" class="mr-2">{{ notification.icon }}</span>
                            <strong v-if="notification.title">{{ notification.title }}</strong>
                        </div>
                        <div class="notification-body">
                            <div>{{ notification.message }}</div>
                            <img v-if="notification.image" :src="notification.image" class="notification-image mt-2">
                            <div v-if="debug" class="debug-info mt-2">
                                Progress: {{ notification.progress }}%<br>
                                Bar Color: {{ notification.barColor || 'Not set' }}
                            </div>
                        </div>
                    </div>
                    <div class="progress-bar" :style="progressBarStyle(notification)"></div>
                </div>
            </transition-group>
        </div>
    </div>
`
});
