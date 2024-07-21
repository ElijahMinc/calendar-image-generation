export interface Slot {
	time: string;
	discount?: boolean
}

export interface Day {
	date: string;
	available_slots: Slot[];
}
