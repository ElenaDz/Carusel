class ButtonMovePosition
{
    static EVENT_OFFSET_POSITION_LEFT = 'ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT';
    static EVENT_OFFSET_POSITION_RIGHT = 'ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT';


    /**
     * @param {JQuery}$context
     */
    constructor($context) {

        this.$context = $context;

        this.$context.on('click', (button) =>
        {
            if ($(button.currentTarget).data('offset') === 'left') {
                this.$context.trigger(ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT);

            } else {
                this.$context.trigger(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT);
            }
        })
    }


    static getTemplate()
    {
        return `
            <button class="previous move_position" data-offset="left"> < </button>
            <button class="next move_position" data-offset="right"> > </button>
        `;
    }

    disabledButton()
    {
        this.$context.prop('disabled', true);
    }

    removeDisabled()
    {
        this.$context.siblings().removeAttr("disabled");
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