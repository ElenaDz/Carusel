class Carousel
{
    /** @type {JQuery} $context */
    $context;

    /** @type {ListItems} list_items */
    list_items;

    static EVENT_SET_POSITION = 'Carousel.EVENT_SET_POSITION';

    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].Carousel) return;

        this.$context[0].Carousel = this;

        this.build();

        ButtonSetPosition.create(this.$context);
        ButtonMovePosition.create(this.$context);
        ListButtonMovePosition.create(this.$context);
        ListButtonSetPosition.create(this.$context);

        this.position = 0;
    }

    build()
    {
        this.$context.addClass('b_carousel');

        this.$context.children().wrapAll('<div class="inner_carousel"></div>');

        this.list_items = ListItems.create(this.$context);
    }

    set position(current_position)
    {
        let position = -(current_position * parseInt(this.$context[0].Carousel.list_items.getWidthItem()));

        this.$context.find('.inner_carousel').css('left', position + 'px');

        this.$context.data('position', current_position);

        this.$context.trigger(Carousel.EVENT_SET_POSITION);
    }

    get position()
    {
        return this.$context.data('position');
    }

    /**
     * @param {string} class_name
     * @return Carousel
     */
    static create(class_name= '.b_carousel')
    {
        // fixme test
        let $context = $(class_name);

        return new Carousel($context);
    }
}