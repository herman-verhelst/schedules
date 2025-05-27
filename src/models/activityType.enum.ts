export class ActivityType {
    static readonly GROUP = new ActivityType('group', '#5C8BF8', 'In groep');
    static readonly VENDEL = new ActivityType('vendel', '#F8A05C', 'Vendel');
    static readonly CHOICE = new ActivityType('choice', '#0d9c4a', 'Keuze');
    static readonly INDIVIDUAL = new ActivityType('individual', '#FC5C5C', 'Individueel');

    id: string;
    color: string;
    type: string;

    private constructor(id: string, color: string, type: string) {
        this.id = id;
        this.color = color;
        this.type = type;
    }
}