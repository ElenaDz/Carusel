class Carousel
{
    /** @type {JQuery} $context */
    $context;

    /** @type {ListItems} list_items */
    list_items;

    /** @type {ListButtonSetPosition} list_set_position */
    list_set_position;

    /** @type {ListButtonMovePosition} list_move_position */
    list_move_position;

    constructor($context)
    {
        this.$context = $context;

        // fixme перенеси в метод build
        this.$context.addClass('b_carousel');

        this.build();

        this.list_items = ListItems.create(this.$context);

        ButtonSetPosition.create(this.$context);
        ButtonMovePosition.create(this.$context);

        // fixme не используется это свойство Удалить
        this.list_move_position = ListButtonMovePosition.create(this.$context, this.list_items.getCountItems());

        this.position = 0;

        this.$context.on(ListButtonMovePosition.EVENT_UPDATE_CAROUSEL, () =>
        {
            this.position = this.$context.data('position');
        });

        this.list_set_position.offsetPosition();
    }

    build()
    {
        this.wrapItems();

        this.buildSetPosition();
        this.buildMovePosition();
    }

    wrapItems()
    {
        this.items = Item.create(this.$context);

        this.$context.children().wrapAll('<div class="inner_carousel"></div>');
    }

    buildSetPosition()
    {
        // fixme не здесь это долно быть а в классе ListButtonSetPosition в методах create build
        // а отсюда это нужно все убрать
        this.$context.append(ListButtonSetPosition.getTemplatePaginate());

        this.list_set_position = ListButtonSetPosition.create(this.$context);

        this.items.forEach((item, index) =>
        {
            this.list_set_position.build(index);
        });
    }

    buildMovePosition()
    {
        // fixme убираем все это в класс ListButtonSetPosition по аналогии с описанным выше
        this.$context.append(ButtonMovePosition.getTemplate());
    }


    set position(current_position)
    {
        let position = -(current_position * parseInt(this.list_items.getWidthItem()));

        this.$context.find('.inner_carousel').css('left', position + 'px');

        this.$context.data('position', current_position);

        this.list_set_position.changeActiveSetPosition(current_position);
    }


    /**
     * @param {string} class_name
     * @return Carousel
     */
    static create(class_name)
    {
        let $context = $(class_name);

        return new Carousel($context);
    }
}