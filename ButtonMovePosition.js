class ButtonMovePosition
{
    /** @type {JQuery} $context */
    $context;

    /** @type {Carousel} carousel */
    carousel;

    /** @type {ListItems} list_items */
    list_items;

    constructor($context) {

        this.$context = $context;

        if (this.$context[0].ButtonMovePosition) return;

        this.$context[0].ButtonMovePosition = this;

        this.carousel = Carousel.create();

        this.list_items = ListItems.create(this.carousel.$context);

        this.$context.on('click', (button) =>
        {
            // fixme используй класс previous, data offset - удалить ok
            if ($(button.currentTarget).hasClass('previous')) {
                this.offsetMovePositionLeft();

            } else {
                this.offsetMovePositionRight();
            }
        })

    }

    // fixme не правильное имя метода, здесь не инициализация а смена позиции ok
    offsetMovePositionLeft()
    {
        let position = this.carousel.position;

        /**
         * @var {ButtonMovePosition}  button_next
         */
        let button_next = this.getButtonNext()[0].ButtonMovePosition;

        button_next.disable = false;

        if (position <= 0) {
            this.disable = true;
            return;
        }

        this.carousel.position = position - 1;
    }

    // fixme не правильное имя метода, здесь не инициализация а смена позиции ok
    offsetMovePositionRight()
    {
        let position = this.carousel.position;

        /**
         * @var {ButtonMovePosition}  button_prev
         */
        let button_prev = this.getButtonPrevious()[0].ButtonMovePosition;

        button_prev.disable = false;

        if (position === this.list_items.getCountItems()) {
            this.disable = true;
            return;
        }

        this.carousel.position = position + 1;
    }

    static getTemplate()
    {
        return `
            <div class="list_button_move_position">
                <button class="move_position previous"> < </button>
                <button class="move_position next"> > </button>
            </div>
        `;
    }

    // fixme вместо этого метода лучше заведи два метода getButtonNext и getButtonPrevious ok

    getButtonNext()
    {
        return this.$context.siblings('.next');
    }

    getButtonPrevious()
    {
        return this.$context.siblings('.previous');
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