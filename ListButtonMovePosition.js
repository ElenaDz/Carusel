
class ListButtonMovePosition {

    /** @type {JQuery} $context */
    $context;

    constructor($context) {

        this.$context = $context;

        ButtonMovePosition.create(this.$context);
    }

    /**
     *
     * @param $context
     * @returns {ListButtonMovePosition}
     */
    static create($context)
    {
        $context.append(ButtonMovePosition.getTemplate());
        return new ListButtonMovePosition($context.find('.list_button_move_position'));
    }
}