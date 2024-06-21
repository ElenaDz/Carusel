class ButtonSetPosition
{
    /**
     * @param {JQuery}$context
     */
    constructor($context) {
        this.$context = $context;

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