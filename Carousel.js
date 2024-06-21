class Carousel {
    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        this.button_set_position = ButtonSetPosition.create(this.$context);
        this.button_move_position = ButtonMovePosition.create(this.$context);

    }

    setPosition()
    {

    }

    /**
     * @param {JQuery} $context
     * @return Carousel
     */
    static create($context = $('body'))
    {
        return new Carousel($context.find('.b_carousel'));
    }
}