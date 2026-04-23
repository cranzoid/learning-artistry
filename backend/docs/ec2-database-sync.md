# EC2 Database Sync

Use this when the EC2 deployment is pointing at a brand-new MySQL database and you want the live database to contain the same course catalog data that already exists in development.

## Why not only run the seeder?

`CourseCatalogSeeder` is useful for bootstrapping the catalog, but the current development database also contains live-facing values that should be preserved exactly.

At the moment, development has:

- `45` published courses
- `6` active catalog categories
- all published courses with `show_price = 0`

Because of that, the safest production move is to import the actual `categories` and `courses` rows from development instead of relying on a fresh reseed.

## 1. Export the development catalog locally

Run this from the machine that has the current development database:

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p learning_artistry \
  --single-transaction \
  --no-tablespaces \
  categories courses > tla-catalog.sql
```

If you also want to move an existing admin login from development, export the matching user row separately:

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p learning_artistry \
  --single-transaction \
  --no-tablespaces \
  users \
  --where="email = 'your-admin-email@example.com'" > tla-admin-user.sql
```

If you do not want to copy a user from development, create a fresh production admin later with:

```bash
php artisan make:filament-user
```

## 2. Copy the export file to EC2

From your local machine:

```bash
scp tla-catalog.sql ubuntu@YOUR_EC2_HOST:/tmp/tla-catalog.sql
```

If you exported an admin user too:

```bash
scp tla-admin-user.sql ubuntu@YOUR_EC2_HOST:/tmp/tla-admin-user.sql
```

## 3. Prepare the live Laravel app on EC2

SSH into the server, go to the backend directory, make sure `.env` points at the live MySQL database, then run:

```bash
php artisan migrate --force
php artisan optimize:clear
```

## 4. Import the catalog into the live MySQL database

Use the live database credentials from the EC2 `.env` file:

```bash
mysql -h YOUR_DB_HOST -P 3306 -u YOUR_DB_USER -p YOUR_DB_NAME < /tmp/tla-catalog.sql
```

If you exported an admin user too:

```bash
mysql -h YOUR_DB_HOST -P 3306 -u YOUR_DB_USER -p YOUR_DB_NAME < /tmp/tla-admin-user.sql
```

## 5. Verify the import

Run a quick count check against production:

```bash
mysql -h YOUR_DB_HOST -P 3306 -u YOUR_DB_USER -p YOUR_DB_NAME -e "
SELECT COUNT(*) AS categories_count FROM categories;
SELECT COUNT(*) AS published_courses FROM courses WHERE status = 'published';
SELECT COUNT(*) AS hidden_price_courses FROM courses WHERE show_price = 0;
"
```

Expected result for the current catalog snapshot:

- `categories_count = 8` if you import the inactive legacy categories too
- `published_courses = 45`
- `hidden_price_courses = 47` if the two archived legacy courses are imported too

If you want production to contain only the current live catalog and not the old archived test rows, export with filters instead:

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p learning_artistry \
  --single-transaction \
  --no-tablespaces \
  categories \
  --where="slug IN ('cloud','data','dev','marketing','pm','quality')" > tla-categories-live.sql
```

```bash
mysqldump \
  -h 127.0.0.1 \
  -P 3306 \
  -u root \
  -p learning_artistry \
  --single-transaction \
  --no-tablespaces \
  courses \
  --where="status = 'published'" > tla-courses-live.sql
```

Then import those two filtered files instead of the full-table export.
