class Carousel {

    // fixme люди которые будут использовать нашу библиотеку могут захотеть сделать карусель любых размеров, ты не можешь здесь использовать точные размеры,
    // ты должна получать ширину карусели программно ok


    /**
     * @param {JQuery} $context
     */
    constructor($context )
    {
        this.$context = $context;

        this.builderItems()

        this.list_items = ListItems.create(this.$context)

        this.builderMovePosition();


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

                this.list_set_position.changeActiveSetPosition(current_position)

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
                this.list_set_position.changeActiveSetPosition(current_position)

                this.position = this.getOffsetForSetPosition(current_position);
            });
        });


        this.button_set_position.forEach((button_set_position) =>
        {
            button_set_position.$context.on(ButtonSetPosition.SELECT_POSITION, () =>
            {
                let activePosition = button_set_position.position;


                this.button_set_position.map((value) =>
                {
                    value.removeClassActive()
                });

                button_set_position.addActive();

                this.items.forEach((item) =>
                {
                    this.position = this.getOffsetForSetPosition(activePosition);
                })

                this.list_set_position.changeActiveSetPosition(activePosition);
            })
        });
    }

    builderItems()
    {
        this.items = Item.create(this.$context);
        this.$context.append(this.getTemplateInnerCarousel());
        let listItems =  ListItems.create(this.$context)
        this.items.forEach((item, index) =>
        {
            listItems.builder(item)
        })
    }
    

    builderSetPosition()
    {
        this.$context.append(ListSetPosition.getTemplatePaginate)

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

    // fixme удалить, карусель не disabled это относиться к кнопкам у которых есть свои классы ok

    // fixme не коректное название метода это не смена позиции это конвертация позиции в смещение можно назватьт getOffsetFromPosition ok
    getOffsetForSetPosition(current_position)
    {
        return -(current_position * parseInt(this.width_item));
    }

    // fixme здесь у тебя возвращется позиция а именно число от 0 до 2х и это правильно
    // fixme ты решила хранить позицию в 2х местах в data атрибуте и в смеещении left и тут же ошиблась, не удивительно выбор хранить что то в 2х местах почти всегода не правильный
    // подумай над тем чтобы хранить это в одно месте а именно в смещении left из него ведь всегда можно получить позицию путем не сложных расчетов

    // fixme а здесь ты передаешь количество пикселей что совсем не явлеяет позицией и это совсем не правильно здесь должно быть тоже числое от 0 до 2х
    set position(position)
    {
        this.$context.find('.inner_carousel').css('left', position + 'px');
    }

    // fixme контекстом здесь является корневой тег карусели для нашего примерал это div.your-class значения по умолчанию здесь нет так как мы не знаем какой класс будет у карусели ok
    /**
     * @param {string} class_name
     * @return Carousel
     */
    static create(class_name)
    {
        let $context = $(class_name)
        return new Carousel($context);
    }
}