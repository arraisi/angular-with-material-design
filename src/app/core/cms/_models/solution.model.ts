import { BaseModel } from '../../_base/crud';

export class SolutionModel {
	id: number;
	title: string;
	text: string;
	category: string;
	file_id: string;

	clear() {
		this.id = null;
		this.title = '';
		this.text = '';
		this.category = '';
		this.file_id = '';
	}
}
