class Carousel {

    static  EVENT_UPDATE_POSITION = 'Carousel.EVENT_UPDATE_POSITION';
    static offset_position = 300;

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;

        this.setActiveIndexItem(this.$context);

        this.builderMovePosition()

        this.list_set_position = ListSetPosition.create(this.$context);

        this.builderSetPosition();

        this.button_set_position = ButtonSetPosition.create(this.$context);
        this.button_move_position = ButtonMovePosition.create(this.$context);

        this.changeActiveSetPosition();

        this.button_move_position.forEach((element) =>
        {
            element.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_LEFT, () =>
            {
                this.removeDisabled('.next');

                let current_position = this.getNextPosition();

                if (current_position < 0) {
                    element.disabledButton();
                    return;
                }

                this.changeClassActive(current_position);

                this.position = this.changePosition();

                $('body').trigger(Carousel.EVENT_UPDATE_POSITION);
            })

            element.$context.on(ButtonMovePosition.EVENT_OFFSET_POSITION_RIGHT, () =>
            {
                this.removeDisabled('.previous');

                let current_position = this.getPreviousPosition();

                if (current_position ===  this.items.length) {
                    element.disabledButton();
                    return;
                }

                this.changeClassActive(current_position);

                this.position = this.changePosition();

                $('body').trigger(Carousel.EVENT_UPDATE_POSITION);
            })
        });


        this.button_set_position.forEach((button_set_position) =>
        {
            button_set_position.$context.on(ButtonSetPosition.SELECT_POSITION, () =>
            {
                this.activePosition = button_set_position.position;

                this.button_set_position.map((value) =>
                {
                    value.removeClassActive()
                });

                button_set_position.addActive();

                this.removeClassActiveItem();

                this.items.forEach((item) =>
                {
                    item.setActive(button_set_position.position);

                    this.position = -(button_set_position.position * Carousel.offset_position);
                })
            })
        })

        $('body').on(Carousel.EVENT_UPDATE_POSITION,() =>
        {
            this.changeActiveSetPosition();
        })
    }

    removeClassActiveItem()
    {
        this.items.map((value) =>
        {
            value.removeClassActive();
        });
    }

    

    builderSetPosition()
    {
        this.items.forEach((item, index) =>
        {
            this.list_set_position.builder(index);
        })
    }
    builderMovePosition()
    {
        this.$context.append(ButtonMovePosition.getTemplate());
    }

    getNextPosition()
    {
        return this.activePosition - 1;
    }

    getPreviousPosition()
    {
        return this.activePosition + 1;
    }

    get activePosition()
    {
        return this.$context.data('active_position');
    }

    set  activePosition(active_position)
    {
        this.$context.data('active_position', active_position);
    }

    removeDisabled(class_name)
    {
        this.$context.find(class_name).removeAttr("disabled");
    }

    changeClassActive(active_position)
    {
        this.$context.find('.item.active').removeClass('active');

        this.$context.find(`[data-index=${active_position}]`).addClass('active');

        this.$context.data('active_position', active_position);
    }

    changeActiveSetPosition()
    {
            this.$context.find('.set_position.active').removeClass('active');

            let active_position = this.$context.data('active_position');

            this.$context.find(`[data-position=${active_position}]`).addClass('active');
    }


    setActiveIndexItem($context)
    {
        this.items = Item.create($context);

        this.items.forEach((item, index) =>
        {
            if (index ===  0) {
                item.$context.addClass('active');

                this.$context.data('active_position', index);
            }
            item.$context.data('index', index);
        })
    }

    changePosition()
    {
        return -(this.position * Carousel.offset_position);
    }
    // позиция css возвращает px
    get position()
    {
       return this.$context.data('active_position');
    }

    set position(position)
    {
        this.$context.find('.inner_carousel').css('left', position + 'px');
    }

    /**
     * @param {JQuery} $context
     * @return Carousel
     */
    static create($context = $('body'))
    {
        return new Carousel($context.find('.b_carousel'));
    }
}