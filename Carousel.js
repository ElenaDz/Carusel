class Carousel
{
    /** @type {JQuery} $context */
    $context;

    /** @type {ListItems} list_items */
    list_items;

    // fixme избавься от этого свойства Не нужно
    /** @type {ListButtonSetPosition} list_button_set_position */
    list_button_set_position;

    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].Carousel) return;

        this.$context[0].Carousel = this;

        this.build();

        ButtonSetPosition.create(this.$context);
        ButtonMovePosition.create(this.$context);
        ListButtonMovePosition.create(this.$context);

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
        // fixme ты делаешь это в build здесь это делать не нужно
        this.list_items = ListItems.create(this.$context);

        let position = -(current_position * parseInt(this.list_items.getWidthItem()));

        this.$context.find('.inner_carousel').css('left', position + 'px');

        this.$context.data('position', current_position);

        // fixme почему это не на строке 26 этого файла?
        this.list_button_set_position = ListButtonSetPosition.create(this.$context);

        // fixme карусель не может управлять list_button_set_position сделай это через подписку на событие
        this.list_button_set_position.setActive(current_position);
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
        let $context = $(class_name);

        return new Carousel($context);
    }
}