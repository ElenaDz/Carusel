class ButtonMovePosition
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
     * @returns {ButtonMovePosition[]}
     */
    static create($context) {
        let $buttons = $context.find('.move_position');
        let buttons = [];
        $buttons.each((index, element) => {
            let $button = $(element);
            buttons.push(new ButtonMovePosition($button));
        })
        return buttons;
    }
}