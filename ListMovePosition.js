class ListMovePosition {

    static EVENT_UPDATE_CAROUSEL = 'ListMovePosition.EVENT_UPDATE_CAROUSEL';

    /** @type {JQuery} $context */
    $context;

    constructor($context) {

        this.$context = $context;
    }

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
        return new ListMovePosition($context.find('.move_position'));
    }
}