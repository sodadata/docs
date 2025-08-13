# Metadata based

These monitors are derived directly from the data platform’s system metadata, without scanning row-level values. They surface structural signals, such as:

* [**Last modification time**](last-modification-time.md): when the dataset was last updated
* [**Schema changes**](schema-changes.md): any alterations to the schema
* [**Total row count**](total-row-count.md): the overall number of records in the dataset
* [**Total row count change**](total-row-count-change.md): the delta in row count compared to the previous observation

Because they read only metadata, these monitors are extremely lightweight to compute and ideal for continuous, real-time dashboarding of dataset activity.
