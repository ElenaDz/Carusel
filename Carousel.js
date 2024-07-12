class Carousel
{
    /**
     * @param {JQuery} $context
     */
    constructor($context )
    {
        // fixme не явное объявление свойства класса, обяъви его явно и все другие свойства во всех классах
        this.$context = $context;

        this.builderItems();

        this.list_items = ListItems.create(this.$context);

        this.builderMovePosition();

        // fixme нет смысла выносить это в свойство класса, ты усложняешь объект без необходимости, объект это список
        // свойств класса и его методов, чем меньше их тем проще объект, чем проще - тем лучше, избався от этого свойства
        this.width_item = this.list_items.getWidthItem();

        this.builderSetPosition();

        this.button_set_position = ButtonSetPosition.create(this.$context);
        this.button_move_position = ButtonMovePosition.create(this.$context);

        this.list_set_position.changeActiveSetPosition(0);

        this.button_move_position.forEach((element) =>
        {
            element.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT, (button) =>
            {
                element.removeDisabled();

                let current_position = this.getNextPosition();

                if (current_position < 0) {
                    element.disabledButton();
                    return;
                }

                this.list_set_position.changeActiveSetPosition(current_position);

                this.position = this.getOffsetForSetPosition(current_position);
            });

            element.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT, () =>
            {
                element.removeDisabled();

                let current_position = this.getPreviousPosition();

                if (current_position ===  this.items.length) {
                    element.disabledButton();
                    return;
                }
                this.list_set_position.changeActiveSetPosition(current_position);

                this.position = this.getOffsetForSetPosition(current_position);
            });
        });


        this.button_set_position.forEach((button_set_position) =>
        {
            button_set_position.$context.on(ButtonSetPosition.SELECT_POSITION, () =>
            {
                let activePosition = button_set_position.position;

                this.list_set_position.removeClassActive();

                button_set_position.addActive();

                this.items.forEach((item) =>
                {
                    this.position = this.getOffsetForSetPosition(activePosition);
                });

                this.list_set_position.changeActiveSetPosition(activePosition);
            })
        });
    }

    // fixme имя метода это глагол, отвечат на вопрос что делать, у тебя builder (строитель) существительно видимо нужно build
    // исправь везде подобную ошибку
    // fixme кучу времени потратил чтобы понять что делает этот метод, а оказалось он не нужен, все что он делает это оборачивает
    // items в inner_carousel, это можно сделать одной строчкой с помощью jquery функции wrap, замени это на одну строчку,
    // и избавься от всего что ты написала ради этой задачи, но больше не нужно, например Item
    builderItems()
    {
        this.items = Item.create(this.$context);

        this.$context.append(this.getTemplateInnerCarousel());

        let listItems = ListItems.create(this.$context);

        // fixme не указан тип item, не работает поиск Ide, это не допустимо
        this.items.forEach((item, index) =>
        {
            listItems.builder(item);
        })
    }
    

    builderSetPosition()
    {
        // fixme чтобы вызвать функцию нужно двойные скобки написать не вижу тут их почему то, исправь или напишиу почему их нет
        this.$context.append(ListSetPosition.getTemplatePaginate);

        this.list_set_position = ListSetPosition.create(this.$context);

        this.items.forEach((item, index) =>
        {
            this.list_set_position.builder(index);
        })
    }

    getTemplateInnerCarousel()
    {
        return `
            <div class="inner_carousel"></div>
        `;
    }

    builderMovePosition()
    {
        this.$context.append(ButtonMovePosition.getTemplate());
    }

    getNextPosition()
    {
        return this.list_set_position.getActivePosition() - 1;
    }

    getPreviousPosition()
    {
        return this.list_set_position.getActivePosition() + 1;
    }

    // fixme убрать слово set из имя фукнции так как оно ни чего не значит
    // fixme убрать слово current из имени параметра так как оно не только для текущей позиции а для любой
    getOffsetForSetPosition(current_position)
    {
        return -(current_position * parseInt(this.width_item));
    }

    // fixme а здесь ты передаешь количество пикселей что совсем не явлеяет позицией и это совсем не правильно
    // здесь должно быть тоже числое от 0 до 2
    set position(position)
    {
        this.$context.find('.inner_carousel').css('left', position + 'px');
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