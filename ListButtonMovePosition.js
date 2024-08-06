// fixme нельзя называть одно и тоже разными именами то у тебя ButtonMovePosition то просто MovePosition выбири одно имя ok
class ListButtonMovePosition {

    static EVENT_UPDATE_CAROUSEL = 'ListButtonMovePosition.EVENT_UPDATE_CAROUSEL';

    /** @type {JQuery} $context */
    $context;

    constructor($context, count_items) {

        this.$context = $context;

        this.initPosition(count_items);
    }

    // fixme на сколько я понял это что то типа инициализации при создании Назови этот метод init в смысыле инициализация ok
    // fixme почему этот метод не в констркторе вызывается? вызови его из конструктора ok
    initPosition(count_items)
    {
        ButtonMovePosition.create(this.$context);

        this.offsetPositionLeft();

        this.offsetPositionRight(count_items);
    }

    offsetPositionLeft()
    {
        this.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT, (button) =>
        {
            let position =  this.$context.parent().data('position');

            let button_move_position = $(button.currentTarget).find('.previous')[0].ButtonMovePosition;

            let button_next = button_move_position.getOppositeButton('.next').ButtonMovePosition;

            button_next.disable = false;

            if (position <= 0) {
                button_move_position.disable = true;
                return;
            }

            this.$context.parent().data('position', position - 1);

            this.$context.trigger(ListButtonMovePosition.EVENT_UPDATE_CAROUSEL);
        });
    }

    offsetPositionRight(count_items)
    {
        this.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT, (button) =>
        {
            let position =  this.$context.parent().data('position');

            let button_move_position = $(button.currentTarget).find('.next')[0].ButtonMovePosition;

            let button_prev = button_move_position.getOppositeButton('.previous').ButtonMovePosition;

            button_prev.disable = false;

            if (position ===  count_items) {
                button_move_position.disable = true;
                return;
            }

            this.$context.parent().data('position', position + 1);

            this.$context.trigger(ListButtonMovePosition.EVENT_UPDATE_CAROUSEL);
        });
    }


    /**
     *
     * @param $context
     * @param count_items
     * @returns {ListButtonMovePosition}
     *
     */
    static create($context, count_items)
    {

        // fixme два очень похожих класса ListButtonMovePosition и ListButtonSetPosition но контекст у них совсем разный, здесь у
        // тебя контекстом явлеяется все найденные элементы с таким классом, а у второго класса контектом явлеяется
        // обертка pagination Обычно у на контекст это один элемент, а здесь много, нужно сделать как везде, чтобы не путаться
        return new ListButtonMovePosition($context.find('.wrap_move'), count_items);
    }
}