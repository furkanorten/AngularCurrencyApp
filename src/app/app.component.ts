import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CurrencyData } from './models/currency.model';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private currencyService: CurrencyService, private fb: FormBuilder) {}

  tmpAmount? : any
  tmpFrom? : any
  tmpConvertedAmount? : any
  tmpTo? : any

  currencyList: Array<any> = this.currencyService.currencies

  currencyForm = this.fb.group(
    {
      from: [''],
      to: [''],
      amount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    }
  )

  currencyData: CurrencyData = {
    success: false,
    validationMessage: [],
    result : {
      from: '',
      to: '',
      amountToConvert: 0,
      convertedAmount: 0
    }
  }

  result: string = '0'

  get control(): {[key:string]: AbstractControl} {
    return this.currencyForm.controls
  }

  ngOnInit(): void {
  }

  convert() {
    this.currencyService.getCurrencyData(this.currencyForm.value.from, this.currencyForm.value.to, this.currencyForm.value.amount).subscribe(res => {
      this.currencyData = res
      this.tmpAmount = this.currencyForm.value.amount
      this.tmpFrom = this.currencyForm.value.from
      this.tmpConvertedAmount = this.currencyData.result.convertedAmount
      this.tmpTo = this.currencyForm.value.to

    },
    error => {
      alert('Can not be converted!')
    })
  }

}
