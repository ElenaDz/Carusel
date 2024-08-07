class ButtonMovePosition
{
    static EVENT_OFFSET_POSITION_LEFT = 'ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT';
    static EVENT_OFFSET_POSITION_RIGHT = 'ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT';


    /** @type {JQuery} $context */
    $context;


    // fixme пишет ошибка "повторное объявление" и действительно такое имя уже занято ниже есть сеттер disable Удалить
    /** @type {boolean} disable */
    disable;


    constructor($context) {

        this.$context = $context;

        if (this.$context[0].ButtonMovePosition) return;

        this.$context[0].ButtonMovePosition = this;

        this.$context.on('click', (button) =>
        {
            // fixme не вводи дополнительный дата атрибут ведь уже есть класс previous и next который можно исопльзовать
            if ($(button.currentTarget).data('offset') === 'left') {
                // fixme здесь не нужно вызывать событие, здесь лучше напрямую обращаться к свойству position
                this.$context.parent().trigger(ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT);

            } else {
                this.$context.parent().trigger(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT);
            }
        })

    }


    static getTemplate()
    {
        return `
            <div class="wrap_move">
                <button class="move_position previous" data-offset="left"> < </button>
                <button class="move_position next" data-offset="right"> > </button>
            </div>
        `;
    }

    getOppositeButton(class_name)
    {
        return this.$context.siblings(class_name)[0];
    }


    /**
     *
     * @param disable
     */
    set disable(disable)
    {
        this.$context.prop('disable', disable);
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