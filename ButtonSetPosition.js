class ButtonSetPosition
{
    static SELECT_POSITION = 'ButtonSetPosition.SELECT_POSITION';
    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$context = $context;

        this.$context.on('click', (button) =>
        {
            this.$context.trigger(ButtonSetPosition.SELECT_POSITION);
        });
    }

    static getTemplate(index)
    {
        return `
                <button class="set_position" data-position=${index}></button>
        `;
    }

    addActive()
    {
        this.$context.addClass('active');
    }
    removeClassActive()
    {
        this.$context.removeClass('active');
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
        })
        return buttons;
    }
}