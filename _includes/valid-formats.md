**Valid formats apply *only* to columns using data type TEXT.** 

| Valid format value  | Format |
| ------------------- | ------ |
| `credit card number` | Four four-digit numbers separated by spaces.<br /> Four four-digit numbers separated by dashes.<br /> Sixteen-digit number.<br /> Four five-digit numbers separated by spaces.<br />|
| `date eu` | Validates date only, not time. <br />dd/mm/yyyy |
| `date inverse` | Validates date only, not time. <br />yyyy/mm/dd |
| `date iso 8601` | Validates date and/or time according to <a href="https://www.w3.org/TR/NOTE-datetime" target="_blank">ISO 8601 format </a>. <br /> 2021-04-28T09:00:00+02:00 |
| `date us` | Validates date only, not time. <br />mm/dd/yyyy |
| `decimal` | Number uses a `,` or `.` as a decimal indicator. |
| `decimal comma` | Number uses `,` as decimal indicator. |
| `decimal point` | Number uses `.` as decimal indicator. |
| `email` | name@domain.extension |
| `integer` | Number is whole. |
| `ip address` | Four whole numbers separated by `.` |
| `ipv4 address` | Four whole numbers separated by `.` |
| `ipv6 address` | Eight values separated by `:` |
| `money` | A money pattern with currency symbol + decimal point or comma + currency abbreviation.|
| `money comma` | A money pattern with currency symbol + decimal comma + currency abbreviation. |
| `money point` | A money pattern with currency symbol + decimal point  + currency abbreviation. |
| `negative decimal` | Negative number uses a `,` or `.` as a decimal indicator.|
| `negative decimal comma` | Negative number uses `,` as decimal indicator. |
| `negative decimal point` | Negative number uses `.` as decimal indicator. |
| `negative integer` | Number is negative and whole. |
| `negative percentage` | Negative number is a percentage.  |
| `negative percentage comma` | Negative number is a percentage with a `,` decimal indicator. | 
| `negative percentage point` | Negative number is a percentage with a `.` decimal indicator. |
| `percentage comma` | Number is a percentage with a `,` decimal indicator. |
| `percentage point` | Number is a percentage with a `.` decimal indicator. |
| `percentage` | Number is a percentage. |
| `phone number` | +12 123 123 1234<br /> 123 123 1234<br /> +1 123-123-1234<br /> +12 123-123-1234<br /> +12 123 123-1234<br /> 555-2368<br /> 555-ABCD |
| `positive decimal` | Postive number uses a `,` or `.` as a decimal indicator. |
| `positive decimal comma` | Positive number uses `,` as decimal indicator. |
| `positive decimal point` | Positive number uses `.` as decimal indicator. |
| `positive integer` | Number is positive and whole. |
| `positive percentage` | Positive number is a percentage.  |
| `positive percentage comma` | Positive number is a percentage with a `,` decimal indicator. |
| `positive percentage point` | Positive number is a percentage with a `.` decimal indicator. |
| `time 12h` | Validates against the 12-hour clock.<br /> hh:mm:ss |
| `time 12h nosec` | Validates against the 12-hour clock.<br /> hh:mm |
| `time 24h` | Validates against the 244-hour clock.<br /> hh:mm:ss |
| `time 24h nosec` | Validates against the 24-hour clock.<br /> hh:mm |
| `timestamp 12h` | Validates against the 12-hour clock. <br /> hh:mm:ss |
| `timestamp 24h` | Validates against the 24-hour clock. <br /> hh:mm:ss |
| `uuid` | Universally unique identifier. | 
