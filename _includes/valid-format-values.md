Valid formats are experimental and subject to change.<br />
**Valid formats apply *only* to columns using data type TEXT.** See [Data types]({% link soda/supported-data-types.md %}).

| Valid format value <br />  | Format |
| ----- | ------ |
| `number_whole` | Number is whole. |
| `number_decimal_point` | Number uses `.` as decimal indicator.|
| `number_decimal_comma` | Number uses `,` as decimal indicator.|
| `number_percentage` | Number is a percentage. |
| `number_money_usd` | Number matches US dollar currency pattern. |
| `number_money_eur` | Number matches Euro currency pattern. |
| `number_money_gbp` | Number matches British pound currency pattern. |
| `number_money_rmb` | Number matches Renminbi yuan currency pattern. |
| `number_money_chf` | Number matches Swiss franc currency pattern. |
| `number_money` | Format matches any of the `number_money_` patterns.|
| `date_eu` | Validates date only, not time. <br />dd/mm/yyyy |
| `date_us` | Validates date only, not time. <br />mm/dd/yyyy |
| `date_inverse` | Validates date only, not time. <br />yyyy/mm/dd |
| `time` | 11:59:00,000<br /> 11:59:00<br /> 11:59<br /> 11-59-00,000<br /> 23:59:00,000<br /> Noon<br /> 1,159 |
| `date_iso_8601` | Validates date and/or time according to <a href="https://www.w3.org/TR/NOTE-datetime" target="_blank">ISO 8601 format </a>. <br />2021, January 21<br /> October 21, 2015 |
| `uuid` | Universally unique identifier. |
| `ip_address` | Four whole numbers separated by `.` |
| `email` | name@domain.extension |
| `phone_number` | +12 123 123 1234<br /> 123 123 1234<br /> +1 123-123-1234<br /> +12 123-123-1234<br /> +12 123 123-1234<br /> 555-2368<br /> 555-ABCD |
| `credit_card_number` | Four four-digit numbers separated by spaces.<br /> Four four-digit numbers separated by dashes.<br /> Sixteen-digit number.<br /> Four five-digit numbers separated by spaces.<br />|