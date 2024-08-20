class Carousel
{
    /** @type {JQuery} $context */
    $context;

    /** @type {ListItems} list_items */
    list_items;

    // fixme переименую свойство Имя объекта и свойства не совпадают ok
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

        // fixme карусель ни чего не знаешь про ListButtonSetPosition все что оно может делать это вызвать create все ok
        // остальное ListButtonSetPosition должен делать сам, если ему для этого нужно items пусть обратиться к карусели
        // и возьмет Перенеси эту строку в конструктор ListButtonSetPosition
    }
    // fixme избавься от этого метода он только усложняет код а не упрощает ok
    // fixme избавься от этого метода он только усложняет код а не упрощает ok

    set position(current_position)
    {
        this.list_items = ListItems.create(this.$context);

        let position = -(current_position * parseInt(this.list_items.getWidthItem()));

        this.$context.find('.inner_carousel').css('left', position + 'px');

        this.$context.data('position', current_position);

        // fixme зачем это если это делается в методе build который вызывается в конструкторе (убрала из build)
        this.list_button_set_position = ListButtonSetPosition.create(this.$context);

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