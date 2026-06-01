# StackOrbit Dataset Information

**Source**: Google Drive link provided by the user

```
https://drive.google.com/file/d/1dmkbDxnzq8HWaFPhu9n6EfEyeC1sb54w/view?usp=drive_link
```

**Local Location**: `c:/Users/jayes/OneDrive/Desktop/StackOrbit/dataset.json`

**File Size**: ~23.7 MB (23,669,269 bytes)

**Content Overview**:
- JSON array of CI/CD pipeline templates.
- Each entry contains fields such as `instruction`, `output`, `topic`, `difficulty`.
- Used by the seeder script (`backend/src/config/seedDataset.js`) to populate the `workflows` collection in MongoDB (first 100 items).

**Usage**:
- The seeder script reads this file, parses it, and inserts workflow documents.
- API endpoints `/api/v1/workflows` expose the data to the frontend.
- You can modify or replace this file with a new dataset; just ensure the JSON structure matches the expected schema.

**Verification**:
- Running `node test-api.js` confirms that 100 items are loaded from this dataset.

*The dataset is already present in the repository, no further action required.*
