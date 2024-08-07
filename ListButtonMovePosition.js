
class ListButtonMovePosition {

    static EVENT_UPDATE_CAROUSEL = 'ListButtonMovePosition.EVENT_UPDATE_CAROUSEL';

    /** @type {JQuery} $context */
    $context;

    constructor($context, count_items) {

        this.$context = $context;

        this.initPosition(count_items);
    }

    // fixme переминуй initMovePosition
    initPosition(count_items)
    {
        ButtonMovePosition.create(this.$context);

        this.offsetPositionLeft();

        this.offsetPositionRight(count_items);
    }

    // fixme переименую initMovePositionLeft
    offsetPositionLeft()
    {
        this.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT, (button) =>
        {
            // fixme через parent() ты обращаешься к dom элементу а так нельзя мы должны работать с объектами,
            // их свойствами и методами Когда объект создается мы его сложм в dom в констуркторе чтобы он не создался
            // втрой раз и чтобы те кому можно взяли там его и обратились к нему Так и сделай Ниже тоже самое исправь
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

    // fixme rename initMovePositionRight
    offsetPositionRight(count_items)
    {
        this.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT, (button) =>
        {
            let position =  this.$context.parent().data('position');

            let button_move_position = $(button.currentTarget).find('.next')[0].ButtonMovePosition;

            let button_prev = button_move_position.getOppositeButton('.previous').ButtonMovePosition;

            button_prev.disable = false;

            // fixme ты так долго передавала count_items ради это строчки? Так не пойдет У объекта Карусель должно быть
            // свйство количество элементов вот и используй его
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
     */
    static create($context, count_items)
    {
        return new ListButtonMovePosition($context.find('.wrap_move'), count_items);
    }
}