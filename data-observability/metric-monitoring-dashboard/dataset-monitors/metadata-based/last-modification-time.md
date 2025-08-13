# Last modification time

#### Definition <a href="#definition" id="definition"></a>

The elapsed interval between the scan time and the timestamp of the most recent change to the database. This includes any change to the data (inserts, updates, deletes) as well as any change to the schema.

#### Source <a href="#source" id="source"></a>

metadata

#### Computation <a href="#computation" id="computation"></a>

The compute method depends on the database. Soda requires specific metadata fields that are different for every database.No sampling used.

#### Exceptions <a href="#exceptions" id="exceptions"></a>

In **Redshift**, adding columns is not part of `last_modification_time`.
