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

    // fixme зачем тебе второе имя для position, одна вещь - одно имя, не исполуй index ok
    static getTemplate(position)
    {
        return `
            <button class="set_position" data-position=${position}></button>
        `;
    }

    addActive()
    {
        this.$context.addClass('active');
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