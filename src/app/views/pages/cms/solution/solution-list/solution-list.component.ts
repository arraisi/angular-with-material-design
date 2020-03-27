// Angular
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// Lodash
import { shuffle } from 'lodash';
// Services
// Widgets model
import { LayoutConfigService, SparklineChartOptions } from '../../../../../core/_base/layout';
import { SolutionListService } from '../solution-list.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { SolutionModel } from '../../../../../core/cms/_models/solution.model';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { SolutionEditComponent } from '../solution-edit/solution-edit.component';

@Component({
	selector: 'kt-solution-list',
	templateUrl: './solution-list.component.html',
	styleUrls: ['solution-list.component.scss'],
})
export class SolutionListComponent implements OnInit {
	displayedColumns = ['id', 'title', 'category', 'actions'];
	dataSource: MatTableDataSource<SolutionModel>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		public layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService
	) {}

	ngOnInit() {

		// Create 100 users
		const users: SolutionModel[] = [
			{ id: 1, title: 'Telco', text: 'Hello World', category: 'solution', file_id: '1', clear() { } },
			{ id: 2, title: 'Traffic management', text: 'Hello World', category: 'solution', file_id: '1', clear() { } },
			{ id: 3, title: 'Banking & finance', text: 'Hello World', category: 'solution', file_id: '1', clear() { } },
			{ id: 4, title: 'Insurance', text: 'Hello World', category: 'solution', file_id: '1', clear() { } },
			{ id: 5, title: 'Logistic', text: 'Hello World', category: 'solution', file_id: '1', clear() { } },
			{ id: 6, title: 'Healthcare', text: 'Hello World', category: 'solution', file_id: '1', clear() { } },
			{ id: 7, title: 'Education', text: 'Hello World', category: 'solution', file_id: '1', clear() { } }
		];

		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(users);
	}
	/**
	* Set the paginator and sort after the view init since this component will
	* be able to query its view for the initialized paginator and sort.
	*/
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	/**
	 * Show add customer dialog
	 */
	addSolution() {
		const newSolution = new SolutionModel();
		newSolution.clear(); // Set all defaults fields
		this.editSolution(newSolution, 'Add Solution');
	}

	/**
	 * Show Edit customer dialog and save after success close result
	 * @param solution: CustomerModel
	 */
	editSolution(solution, title) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
		saveMessageTranslateParam += solution.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = solution.id > 0 ? MessageType.Update : MessageType.Create;
		console.log(_saveMessage);
		console.log(_messageType);


		const dialogRef = this.dialog.open(SolutionEditComponent, { data: { solution, title } });
		dialogRef.afterClosed().subscribe(res => {
			console.log(res);

			if (!res) {
				return;
			}
		});
	}

}
