class Carousel
{
    /** @type {JQuery} $context */
    $context;

    /** @type {ListItems} $context */
    list_items;

    /** @type {ButtonSetPosition} $context */
    button_set_position;

    /** @type {ButtonMovePosition} $context */
    button_move_position;

    /** @type {ListSetPosition} $context */
    list_set_position;

    constructor($context)
    {
        // fixme не явное объявление свойства класса, обяъви его явно и все другие свойства во всех классах ok
        this.$context = $context;

        this.$context.addClass('b_carousel');

        this.wrapItems();

        this.list_items = ListItems.create(this.$context);

        this.builderMovePosition();

        // fixme нет смысла выносить это в свойство класса, ты усложняешь объект без необходимости, объект это список ok
        // свойств класса и его методов, чем меньше их тем проще объект, чем проще - тем лучше, избався от этого свойства ok

        this.builderSetPosition();

        this.button_set_position = ButtonSetPosition.create(this.$context);
        this.button_move_position = ButtonMovePosition.create(this.$context);
        this.list_move_position = ListMovePosition.create(this.$context);

        this.position = 0;

        this.list_move_position.offsetPosition(this.list_items.getCountItems());

        this.$context.on(ListMovePosition.EVENT_UPDATE_CAROUSEL, () =>
        {
            this.position = this.$context.data('position');
        });

        this.list_set_position.offsetPosition();
    }

    // fixme имя метода это глагол, отвечат на вопрос что делать, у тебя builder (строитель) существительно видимо нужно build ok
    // исправь везде подобную ошибку
    // fixme кучу времени потратил чтобы понять что делает этот метод, а оказалось он не нужен, все что он делает это оборачивает  ok
    // items в inner_carousel, это можно сделать одной строчкой с помощью jquery функции wrap, замени это на одну строчку,
    // и избавься от всего что ты написала ради этой задачи, оно больше не нужно, например Item
    wrapItems()
    {
        this.items = Item.create(this.$context);

        this.$context.children().wrapAll('<div class="inner_carousel"></div>');
    }

    builderSetPosition()
    {
        // fixme чтобы вызвать функцию нужно двойные скобки написать не вижу тут их почему то, исправь или напишиу почему их нет ok
        this.$context.append(ListSetPosition.getTemplatePaginate());

        this.list_set_position = ListSetPosition.create(this.$context);

        this.items.forEach((item, index) =>
        {
            this.list_set_position.builder(index);
        });
    }

    builderMovePosition()
    {
        this.$context.append(ButtonMovePosition.getTemplate());
    }


    // fixme убрать слово set из имя фукнции так как оно ни чего не значит ok
    // fixme убрать слово current из имени параметра так как оно не только для текущей позиции а для любой ok

    // fixme а здесь ты передаешь количество пикселей что совсем не явлеяет позицией и это совсем не правильно ok
    // здесь должно быть тоже числое от 0 до 2 ok
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