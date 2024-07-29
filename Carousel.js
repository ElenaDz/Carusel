class Carousel
{
    /** @type {JQuery} $context */
    $context;

    // fixme явно испльзуешь копирование раз у тебя тут $context зачем то написан,
    // бей себя по рукам когда хочеться копировать, убери $context везде где он не нужен
    /** @type {ListItems} $context */
    list_items;

    // fixme не используется, удалить
    /** @type {ButtonSetPosition} $context */
    button_set_position;

    // fixme не используется, удалить
    /** @type {ButtonMovePosition} $context */
    button_move_position;

    /** @type {ListSetPosition} $context */
    list_set_position;

    constructor($context)
    {
        this.$context = $context;

        this.$context.addClass('b_carousel');

        this.wrapItems();

        this.list_items = ListItems.create(this.$context);

        this.builderMovePosition();

        this.builderSetPosition();

        this.button_set_position = ButtonSetPosition.create(this.$context);
        this.button_move_position = ButtonMovePosition.create(this.$context);

        // fixme просто переменная а не свойство
        // fixme не указан тип не рабоатет автокомплит очень серьезная ошибка, правила которое нельзя нарушати - ide
        // должна полностью понимать твой код а это значит везде должен работать автокомплит
        this.list_move_position = ListMovePosition.create(this.$context);

        this.position = 0;

        this.list_move_position.offsetPosition(this.list_items.getCountItems());

        this.$context.on(ListMovePosition.EVENT_UPDATE_CAROUSEL, () =>
        {
            this.position = this.$context.data('position');
        });

        this.list_set_position.offsetPosition();
    }

    // todo почему бы тебе не создать метод build и вызывать из него методы
    /** @link Carousel.wrapItems */
    /** @link Carousel.builderSetPosition */
    /** @link Carousel.builderMovePosition */
    wrapItems()
    {
        this.items = Item.create(this.$context);

        this.$context.children().wrapAll('<div class="inner_carousel"></div>');
    }

    // fixme build потому что глагол
    builderSetPosition()
    {
        this.$context.append(ListSetPosition.getTemplatePaginate());

        this.list_set_position = ListSetPosition.create(this.$context);

        this.items.forEach((item, index) =>
        {
            this.list_set_position.builder(index);
        });
    }

    // fixme build потому что глагол
    builderMovePosition()
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