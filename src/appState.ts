import 'jquery';

declare var jQuery: any;

export class ApplicationState { 

   config = {
        name: 'Andromia',
        title: 'Sing Dashboard App with Angular 2.0 support by Flatlogic',
        version: '3.2.0',
        /**
         * Whether to print and alert some log information
         */
        debug: true,
        /**
         * In-app constants
         */
        settings: {
            colors: {
                'white': '#fff',
                'black': '#000',
                'gray-light': '#999',
                'gray-lighter': '#eee',
                'gray': '#666',
                'gray-dark': '#343434',
                'gray-darker': '#222',
                'gray-semi-light': '#777',
                'gray-semi-lighter': '#ddd',
                'brand-primary': '#5d8fc2',
                'brand-success': '#64bd63',
                'brand-warning': '#f0b518',
                'brand-danger': '#dd5826',
                'brand-info': '#5dc4bf'
            },
            screens: {
                'xs-max': 543,
                'sm-min': 544,
                'sm-max': 767,
                'md-min': 768,
                'md-max': 991,
                'lg-min': 992,
                'lg-max': 1199,
                'xl-min': 1200
            },
            navCollapseTimeout: 2500
        },
        state: {
            'nav-static': true
        }
    };
    _resizeCallbacks = [];
    _screenSizeCallbacks = {
        xs: { enter: [], exit: [] },
        sm: { enter: [], exit: [] },
        md: { enter: [], exit: [] },
        lg: { enter: [], exit: [] },
        xl: { enter: [], exit: [] }
    };

    isScreen(size): boolean {
        let screenPx = window.innerWidth;
        return (screenPx >= this.config.settings.screens[size + '-min'] || size === 'xs')
            && (screenPx <= this.config.settings.screens[size + '-max'] || size === 'xl');
    }

    getScreenSize(): string {
        let screenPx = window.innerWidth;
        if (screenPx <= this.config.settings.screens['xs-max']) { return 'xs'; }
        if ((screenPx >= this.config.settings.screens['sm-min'])
            && (screenPx <= this.config.settings.screens['sm-max'])) { return 'sm'; }
        if ((screenPx >= this.config.settings.screens['md-min'])
            && (screenPx <= this.config.settings.screens['md-max'])) { return 'md'; }
        if ((screenPx >= this.config.settings.screens['lg-min'])
            && (screenPx <= this.config.settings.screens['lg-max'])) { return 'lg'; }
        if (screenPx >= this.config.settings.screens['xl-min']) { return 'xl'; }
    }

    onScreenSize(size, fn, /* Boolean= */ onEnter): void {
        onEnter = typeof onEnter !== 'undefined' ? onEnter : true;
        if (typeof size === 'object') {
            for (let i = 0; i < size.length; i++) {
                this._screenSizeCallbacks[size[i]][onEnter ? 'enter' : 'exit'].push(fn);
            }
        } else {
            this._screenSizeCallbacks[size][onEnter ? 'enter' : 'exit'].push(fn);
        }

    }

    _initResizeEvent(): void {
        let resizeTimeout;

        jQuery(window).on('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                jQuery(window).trigger('sn:resize');
            }, 100);
        });
    }

    _initOnScreenSizeCallbacks(): void {
        let resizeTimeout,
            prevSize = this.getScreenSize();

        jQuery(window).resize(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                let size = this.getScreenSize();
                if (size !== prevSize) { // run only if something changed
                    // run exit callbacks first
                    this._screenSizeCallbacks[prevSize].exit.forEach((fn) => {
                        fn(size, prevSize);
                    });
                    // run enter callbacks then
                    this._screenSizeCallbacks[size].enter.forEach((fn) => {
                        fn(size, prevSize);
                    });
                    console.log('screen changed. new: ' + size + ', old: ' + prevSize);
                }
                prevSize = size;
            }, 100);
        });
    }

    constructor() {
        this._initResizeEvent();
        this._initOnScreenSizeCallbacks();
    }

    getConfig(): Object {
        return this.config;
    }
}