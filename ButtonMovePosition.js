class ButtonMovePosition
{
    /** @type {JQuery} $context */
    $context;

    /** @type {Carousel} carousel */
    carousel;

    // fixme пишет ошибка "повторное объявление" и действительно такое имя уже занято ниже есть сеттер disable Удалить ok

    constructor($context) {

        this.$context = $context;

        if (this.$context[0].ButtonMovePosition) return;

        this.$context[0].ButtonMovePosition = this;

        this.carousel = Carousel.create();

        this.$context.on('click', (button) =>
        {
            // fixme не вводи дополнительный дата атрибут ведь уже есть класс previous и next который можно исопльзовать ok
            if ($(button.currentTarget).data('offset') === 'previous') {
                // fixme здесь не нужно вызывать событие, здесь лучше напрямую обращаться к свойству position  ok
                this.initMovePositionLeft();
            } else {
                this.initMovePositionRight();
            }
        })

    }
    initMovePositionLeft()
    {
        // fixme через parent() ты обращаешься к dom элементу а так нельзя мы должны работать с объектами, ok
        // их свойствами и методами Когда объект создается мы его сложм в dom в констуркторе чтобы он не создался
        // втрой раз и чтобы те кому можно взяли там его и обратились к нему Так и сделай Ниже тоже самое исправь
        let position = this.carousel.position;

        let button_next = this.getOppositeButton('.next').ButtonMovePosition;

        button_next.disable = false;

        if (position <= 0) {
            this.disable = true;
            return;
        }

        this.carousel.position = position - 1;

    }

    // fixme rename initMovePositionRight ok
    initMovePositionRight()
    {
        let position = this.carousel.position;

        let button_prev = this.getOppositeButton('.previous').ButtonMovePosition;

        button_prev.disable = false;

        // fixme ты так долго передавала count_items ради это строчки? Так не пойдет У объекта Карусель должно быть ok
        // свйство количество элементов вот и используй его
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