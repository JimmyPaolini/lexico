-- @block show tables
SELECT * FROM pg_catalog.pg_tables ORDER BY schemaname DESC

-- @block describe table
SELECT * FROM information_schema.columns WHERE table_name = 'migrations'

-- @block describe constraints
SELECT * FROM pg_catalog.pg_constraint

-- @block show indices
SELECT * FROM pg_indexes WHERE tablename NOT LIKE 'pg%'

-- @block show migrations
SELECT * FROM migrations

-- @block delete migrations
DELETE FROM migrations

-- @block users
SELECT * FROM public.user

-- @block bookmarks
SELECT * FROM user_bookmarks_entry

-- @block custom texts
SELECT * FROM custom_text