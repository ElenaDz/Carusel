class ButtonSetPosition
{
    static SELECT_POSITION = 'ButtonSetPosition.SELECT_POSITION';

    /** @type {JQuery} $context */
    $context;

    constructor($context) {
        this.$context = $context;

        this.$context.on('click', (button) =>
        {
            this.$context.trigger(ButtonSetPosition.SELECT_POSITION);
        });
    }

    static getTemplate(position)
    {
        return `
            <button class="set_position" data-position=${position}></button>
        `;
    }

    // fixme а если active false передадут и класс active уже добавлен Исправь
    set active(active)
    {
        if (active === true) {
            this.$context.addClass('active');
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