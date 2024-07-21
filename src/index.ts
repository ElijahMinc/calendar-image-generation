import { data } from "./data";
import { createCanvas, loadImage } from "canvas";
import moment from "moment";
import { BORDER_RADIUS, CELL_HEIGHT, CELL_WIDTH, DAY_SPACING, HEADER_HEIGHT, HEIGHT, ICON_SIZE, PADDING, TIME_SLOTS_MARGIN_TOP, WIDTH } from "./constants";
import { Day } from "src/types";
import { drawRoundedRect } from "./helpers/drawRoundedRect";
import * as fs from 'fs';
import path from 'path'

 const drawCalendar = async (data: Day[]) => {
	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext('2d');
	const discountIcon = await loadImage('./src/assets/discount-icon.png');

	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, WIDTH, HEIGHT);

	ctx.fillStyle = '#000000';
	ctx.font = '20px Arial';
	ctx.textAlign = 'center';
	ctx.fillText('Selecciona día y horario', WIDTH / 2, 50);

	data.forEach((day, columnIndex) => {
		 const date = moment(day.date);
		 const dayLabel = `${date.format('dddd')} ${date.format('DD/MM')}`;
		 
		 ctx.fillStyle = '#000000';
		 ctx.font = '19px Arial';
		 ctx.fillText(dayLabel, PADDING + columnIndex * (CELL_WIDTH + DAY_SPACING) + CELL_WIDTH / 2, HEADER_HEIGHT);

		 day.available_slots.forEach((slot, rowIndex) => {
			  const discount = slot?.discount ?? false

			  const x = PADDING + columnIndex * (CELL_WIDTH + DAY_SPACING);
			  const y = TIME_SLOTS_MARGIN_TOP + HEADER_HEIGHT + PADDING + rowIndex * (CELL_HEIGHT + PADDING);

			  // Draw slot background
			  ctx.fillStyle = '#F0F0F0';
			  drawRoundedRect(ctx as any, x, y, CELL_WIDTH, CELL_HEIGHT, BORDER_RADIUS);
			  ctx.fill();

			  // Draw slot border and shadow with rounded corners
			  ctx.strokeStyle = '#E0E0E0';
			  ctx.lineWidth = 1;
			  ctx.stroke();
			  ctx.fillStyle = '#FFFFFF';
			  
			  drawRoundedRect(ctx as any, x + 2, y + 2, CELL_WIDTH - 4, CELL_HEIGHT - 4, BORDER_RADIUS);
			  ctx.fill();

			  // Draw time text
			  ctx.fillStyle = '#000';
			  ctx.font = '16px Arial';
			  ctx.fillText(slot.time, x + CELL_WIDTH / 2, y + CELL_HEIGHT / 2 + 6);


			  if(!discount) return;

			  ctx.drawImage(discountIcon, x + CELL_WIDTH - ICON_SIZE - 10, y + CELL_HEIGHT / 2 - ICON_SIZE / 2, ICON_SIZE, ICON_SIZE);
		   // Manual way to draw icon (simulated as a red circle for simplicity)
			//   ctx.beginPath();
			//   ctx.arc(x + CELL_WIDTH - 20, y + CELL_HEIGHT / 2, 8, 0, 2 * Math.PI);
			//   ctx.fillStyle = '#FF0000';
			//   ctx.fill();
		 });
	});

	const buffer = canvas.toBuffer('image/png');
	fs.writeFileSync('./src/assets/calendar.png', buffer);
};

const start = () => {
   //  console.time('Starting to draw a calendar')
    drawCalendar(data);
   //  console.timeEnd('The end of the calendar drawing')
}


start();