class ButtonSetPosition
{
    /** @type {JQuery} $context */
    $context;

    /** @type {Carousel} carousel */
    carousel;

    constructor($context) {
        this.$context = $context;

        if (this.$context[0].ButtonSetPosition) return;

        this.$context[0].ButtonSetPosition = this;

        this.carousel = Carousel.create();

        this.$context.on('click', (button) =>
        {
            let active_position = this.position;

            this.active = false;

            button.active = true;

            this.carousel.position = active_position;
        });
    }

    static getTemplate(position)
    {
        return `
            <button class="set_position" data-position=${position}></button>
        `;
    }

    set active(active)
    {
        if (active === true) {
            this.$context.addClass('active');
        } else {
            this.$context.removeClass('active');
        }
    }

    get position()
    {
        return this.$context.data('position');
    }

    /**
     *
     * @param {jQuery} $context
     * @returns {ButtonSetPosition[]}
     */
    static create($context) {
        let $buttons = $context.find('.set_position');
        let buttons = [];
        $buttons.each((index, element) => {
            let $button = $(element);
            buttons.push(new ButtonSetPosition($button));
        });
        return buttons;
    }
}