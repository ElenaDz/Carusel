class ButtonMovePosition
{
    static EVENT_OFFSET_POSITION_LEFT = 'ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT';
    static EVENT_OFFSET_POSITION_RIGHT = 'ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT';


    /** @type {JQuery} $context */
    $context;

    constructor($context) {

        this.$context = $context;

        if (this.$context[0].ButtonMovePosition) return;

        this.$context[0].ButtonMovePosition = this;

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
        // fixme общие имена классов должны идти первыми, отличающиеся после ок
        return `
            <button class="move_position previous " data-offset="left"> < </button>
            <button class="move_position next " data-offset="right"> > </button>
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
        });
        return buttons;
    }
}