class ListSetPosition {

    /**
     * @param {JQuery} $context
     */
    constructor($context)
    {
        this.$context = $context;
    }

    builder(index)
    {
        this.$context.append(ButtonSetPosition.getTemplate(index));
    }

    /**
     * @param {JQuery} $context
     * @return ListSetPosition
     */
    static create($context)
    {
        return new ListSetPosition($context.find('.pagination'));
    }
}