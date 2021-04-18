FROM fluent/fluent-bit:1.7
ADD fluentbit.conf /fluent-bit/etc/fluent-bit.conf
EXPOSE 24224