export class Modal {
    #visible = false;

    constructor(target, cancel) {
        this.target = target;
        this.#tick();
        this.cancel = cancel;
        this.#appendModalHeader();
    }

    open() {
        this.#visible = true;
        this.#tick();
    }

    close(e) {
        if (e) e.stopPropagation();
        this.#visible = false;
        this.#tick();
    }

    #tick() {
        if (this.target) {
            this.target.dataset.open = this.#visible;
            this.target.open = this.#visible;
        }
    }

    isOpen() {
        return this.#visible
    }

    #appendModalHeader() {
        if (this.target) {
            const header = document.createElement('div');
            header.className = 'modal__header';

            const closeButton = document.createElement('button');
            closeButton.className = 'modal__close-button';
            closeButton.addEventListener('click', this.cancel ?? this.close.bind(this));

            const closeButtonIcon = document.createElement('ion-icon');
            closeButtonIcon.name = 'close';

            closeButton.appendChild(closeButtonIcon);
            header.appendChild(closeButton);

            this.target.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.cancel ?? this.close.bind(this)
            });

            this.target.appendChild(header);
        }
    }
}

export function WithModal(controller) {
    return class extends controller {
        static targets = ['modal'].concat(controller.targets ?? []);
        modal = new Modal(this.modalTarget, this.cancel?.bind(this));
    }
}