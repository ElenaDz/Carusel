class ButtonMovePosition
{
    /** @type {JQuery} $context */
    $context;

    /** @type {Carousel} carousel */
    carousel;


    constructor($context) {

        this.$context = $context;

        if (this.$context[0].ButtonMovePosition) return;

        this.$context[0].ButtonMovePosition = this;

        this.carousel = Carousel.create();

        this.$context.on('click', (button) =>
        {
            // fixme используй класс previous, data offset - удалить
            if ($(button.currentTarget).data('offset') === 'previous') {
                this.initMovePositionLeft();

            } else {
                this.initMovePositionRight();
            }
        })

    }

    // fixme не правильное имя метода, здесь не инициализация а смена позиции
    initMovePositionLeft()
    {
        let position = this.carousel.position;

        let button_next = this.getOppositeButton('.next').ButtonMovePosition;

        button_next.disable = false;

        if (position <= 0) {
            this.disable = true;
            return;
        }

        this.carousel.position = position - 1;

    }

    // fixme не правильное имя метода, здесь не инициализация а смена позиции
    initMovePositionRight()
    {
        let position = this.carousel.position;

        let button_prev = this.getOppositeButton('.previous').ButtonMovePosition;

        button_prev.disable = false;

        if (position === this.carousel.getCountItems()) {
            this.disable = true;
            return;
        }

        this.carousel.position = position + 1;
    }

    static getTemplate()
    {
        return `
            <div class="list_button_move_position">
                <button class="move_position previous" data-offset="previous"> < </button>
                <button class="move_position next" data-offset="next"> > </button>
            </div>
        `;
    }

    // fixme вместо этого метода лучше заведи два метода getButtonNext и getButtonPrevious
    getOppositeButton(class_name)
    {
        return this.$context.siblings(class_name)[0];
    }


    /**
     *
     * @param disable
     */
    set disable(disable)
    {
        this.$context.prop('disable', disable);
    }

    /**
     *
     * @param {jQuery} $context
     * @returns {ButtonMovePosition[]}
     */
    static create($context) {
        let $buttons = $context.find('.move_position');
        let buttons = [];
        $buttons.each((index, element) => {
            let $button = $(element);
            buttons.push(new ButtonMovePosition($button));
        });
        return buttons;
    }
}