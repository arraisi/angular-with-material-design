// Angular
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
// Translate Module
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'kt-solution-edit',
	templateUrl: './solution-edit.component.html',
})
export class SolutionEditComponent {
	form: FormGroup;
	title: string;
	public model = {
        editorData: ''
    };

	constructor(
		private fb: FormBuilder,
		public dialogRef: MatDialogRef<SolutionEditComponent>,
		@Inject(MAT_DIALOG_DATA) data) {
			console.log(data, 'warisan');

		this.title = data.title;
	}

	ngOnInit() {
		this.form = this.fb.group({
			title: ['', Validators.required],
			text: ['', Validators.required]
		});
	}

	onSubmit() {
		this.form.patchValue({
			text: this.model.editorData
		});
		this.dialogRef.close(this.form.value);
	}

	close() {
		this.dialogRef.close();
	}

}
