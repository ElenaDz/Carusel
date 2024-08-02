class Carousel
{
    /** @type {JQuery} $context */
    $context;

    // fixme явно испльзуешь копирование раз у тебя тут $context зачем то написан,
    // бей себя по рукам когда хочеться копировать, убери $context везде где он не нужен ок
    /** @type {ListItems} list_items */
    list_items;


    /** @type {ListButtonSetPosition}  list_set_position */
    list_set_position;

    /** @type {ListButtonMovePosition}  list_move_position */
    list_move_position;

    constructor($context)
    {
        this.$context = $context;

        this.$context.addClass('b_carousel');

        this.build();

        this.list_items = ListItems.create(this.$context);
        // init button
        ButtonSetPosition.create(this.$context);
        ButtonMovePosition.create(this.$context);

        // fixme просто переменная а не свойство
        // fixme не указан тип не рабоатет автокомплит очень серьезная ошибка, правила которое нельзя нарушати - ide
        // должна полностью понимать твой код а это значит везде должен работать автокомплит ok
        this.list_move_position = ListButtonMovePosition.create(this.$context, this.list_items.getCountItems());

        this.position = 0;

        // this.list_move_position.initPosition(this.list_items.getCountItems());

        this.$context.on(ListButtonMovePosition.EVENT_UPDATE_CAROUSEL, () =>
        {
            this.position = this.$context.data('position');
        });

        this.list_set_position.offsetPosition();
    }

    // todo почему бы тебе не создать метод build и вызывать из него методы ok
    /** @link Carousel.wrapItems */
    /** @link Carousel.buildSetPosition */
    /** @link Carousel.buildMovePosition */

    build()
    {
        this.wrapItems();
        this.buildMovePosition();
        this.buildSetPosition();
    }

    wrapItems()
    {
        this.items = Item.create(this.$context);

        this.$context.children().wrapAll('<div class="inner_carousel"></div>');
    }

    // fixme build потому что глагол 0k
    buildSetPosition()
    {
        this.$context.append(ListButtonSetPosition.getTemplatePaginate());

        this.list_set_position = ListButtonSetPosition.create(this.$context);

        this.items.forEach((item, index) =>
        {
            this.list_set_position.build(index);
        });
    }

    // fixme build потому что глагол ok
    buildMovePosition()
    {
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