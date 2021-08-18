-- @block expletives
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'fuck', 'f*ck', 'gi') WHERE translation ~* 'fuck';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'shit', 'sh*t', 'gi') WHERE translation ~* 'shit' AND translation !~* 'shittim' AND translation !~* 'Cushitic';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'bitch', 'b*tch', 'gi') WHERE translation ~* 'bitch';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'cunt', 'c*nt', 'gi') WHERE translation ~* 'cunt';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'piss', 'p*ss', 'gi') WHERE translation ~* 'piss' AND translation !~* 'pissō';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'asshole', 'a*sshole', 'gi') WHERE translation ~* 'asshole';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'cocksucker', 'c*cksucker', 'gi') WHERE translation ~* 'cocksucker';
UPDATE translation SET translation = REGEXP_REPLACE(translation, 'faggot', 'f*ggot', 'gi') WHERE translation ~* 'faggot';
