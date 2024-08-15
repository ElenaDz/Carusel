class Carousel
{
    /** @type {JQuery} $context */
    $context;

    /** @type {ListItems} list_items */
    list_items;

    /** @type {ListButtonSetPosition} list_set_position */
    list_set_position;

    constructor($context)
    {
        this.$context = $context;

        if (this.$context[0].Carousel) return;

        this.$context[0].Carousel = this;

        // fixme перенеси в метод build ok
        this.build();

        ButtonSetPosition.create(this.$context);
        ButtonMovePosition.create(this.$context);

        // fixme не используется это свойство Удалить ok
        ListButtonMovePosition.create(this.$context);

        this.position = 0;
    }

    build()
    {
        this.$context.addClass('b_carousel');

        this.wrapItems();

        this.list_items = ListItems.create(this.$context);

        this.buildSetPosition();
    }

    wrapItems()
    {
        this.items = Item.create(this.$context);

        this.$context.children().wrapAll('<div class="inner_carousel"></div>');
    }

    buildSetPosition()
    {
        // fixme не здесь это долно быть а в классе ListButtonSetPosition в методах create build ok
        // а отсюда это нужно все убрать

        this.list_set_position = ListButtonSetPosition.create(this.$context);

        this.list_set_position.build(this.items);
    }


    getCountItems()
    {
        this.list_items = ListItems.create(this.$context);

        return this.list_items.getCountItems();
    }

    set position(current_position)
    {
        this.list_items = ListItems.create(this.$context);

        let position = -(current_position * parseInt(this.list_items.getWidthItem()));

        this.$context.find('.inner_carousel').css('left', position + 'px');

        this.$context.data('position', current_position);

        this.list_set_position = ListButtonSetPosition.create(this.$context);

        this.list_set_position.setActive(current_position);
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