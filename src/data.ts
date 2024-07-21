import { Day } from "./types";

export const data: Day[] = [
	{
		 date: "2023-09-01",
		 available_slots: [
			  { time: "10:40", discount: true },
			  { time: "12:20", discount: true }
		 ]
	},
	{
		date: "2023-09-02",
		available_slots: [
			 { time: "10:00",  discount: true  },
			 { time: "10:40",  discount: true  },
			 { time: "12:00",  discount: true  },
			 { time: "12:40",  discount: true  },
			 { time: "13:20",  discount: true  },
			 { time: "15:40",  discount: true  },
			 { time: "16:20",  discount: true  }
		]
  },
	{
		 date: "2023-09-03",
		 available_slots: [
			  { time: "10:40" },
			  { time: "12:00", discount: true  },
			  { time: "12:40" },
			  { time: "13:20" },
			  { time: "16:20" },
			  { time: "17:00" }
		 ]
	}
];