// fixme нельзя называть одно и тоже разными именами то у тебя ButtonMovePosition то просто MovePosition выбири одно имя
class ListMovePosition {

    static EVENT_UPDATE_CAROUSEL = 'ListMovePosition.EVENT_UPDATE_CAROUSEL';

    /** @type {JQuery} $context */
    $context;

    constructor($context) {

        this.$context = $context;
    }

    // fixme на сколько я понял это что то типа инициализации при создании Назови этот метод init в смысыле инициализация
    // fixme почему этот метод не в констркторе вызывается? вызови его из конструктора
    offsetPosition(count_items)
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
            let button_move_position = $(button.currentTarget)[0].ButtonMovePosition;
            button_move_position.removeDisabled();

            if (position <= 0) {
                button_move_position.disabledButton();
                return;
            }

            this.$context.parent().data('position', position - 1);

            this.$context.trigger(ListMovePosition.EVENT_UPDATE_CAROUSEL);
        });
    }

    offsetPositionRight(count_items)
    {
        this.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT, (button) =>
        {
            let position =  this.$context.parent().data('position');
            let button_move_position = $(button.currentTarget)[0].ButtonMovePosition;

            button_move_position.removeDisabled()

            if (position ===  count_items) {
                button_move_position.disabledButton();
                return;
            }

            this.$context.parent().data('position', position + 1);

            this.$context.trigger(ListMovePosition.EVENT_UPDATE_CAROUSEL);
        });
    }



    static create($context)
    {
        // fixme два очень похожих класса ListMovePosition и ListSetPosition но контекст у них совсем разный, здесь у
        // тебя контекстом явлеяется все найденные элементы с таким классом, а у второго класса контектом явлеяется
        // обертка pagination Обычно у на контекст это один элемент, а здесь много, нужно сделать как везде, чтобы не путаться
        return new ListMovePosition($context.find('.move_position'));
    }
}