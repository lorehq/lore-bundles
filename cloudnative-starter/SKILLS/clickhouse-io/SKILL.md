---
name: clickhouse-io
description: ClickHouse database patterns, query optimization, analytics, and data engineering best practices for high-performance analytical workloads.
user-invocable: false
---

# ClickHouse Analytics Patterns

ClickHouse-specific patterns for high-performance analytics and data engineering.

## Overview

ClickHouse is a column-oriented database management system (DBMS) for online analytical processing (OLAP). It's optimized for fast analytical queries on large datasets.

**Key Features:**
- Column-oriented storage
- Data compression
- Parallel query execution
- Distributed queries
- Real-time analytics

## Table Design Patterns

### MergeTree Engine (Most Common)

```sql
CREATE TABLE markets_analytics (
    date Date,
    market_id String,
    market_name String,
    volume UInt64,
    trades UInt32,
    unique_traders UInt32,
    avg_trade_size Float64,
    created_at DateTime
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, market_id)
SETTINGS index_granularity = 8192;
```

### ReplacingMergeTree (Deduplication)

```sql
CREATE TABLE user_events (
    event_id String,
    user_id String,
    event_type String,
    timestamp DateTime,
    properties String
) ENGINE = ReplacingMergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (user_id, event_id, timestamp)
PRIMARY KEY (user_id, event_id);
```

### AggregatingMergeTree (Pre-aggregation)

```sql
CREATE TABLE market_stats_hourly (
    hour DateTime,
    market_id String,
    total_volume AggregateFunction(sum, UInt64),
    total_trades AggregateFunction(count, UInt32),
    unique_users AggregateFunction(uniq, String)
) ENGINE = AggregatingMergeTree()
PARTITION BY toYYYYMM(hour)
ORDER BY (hour, market_id);
```

## Query Optimization Patterns

### Efficient Filtering

```sql
-- GOOD: Use indexed columns first
SELECT * FROM markets_analytics
WHERE date >= '2025-01-01' AND market_id = 'market-123' AND volume > 1000
ORDER BY date DESC LIMIT 100;

-- BAD: Filter on non-indexed columns first
SELECT * FROM markets_analytics
WHERE volume > 1000 AND market_name LIKE '%election%' AND date >= '2025-01-01';
```

### Aggregations

```sql
SELECT
    toStartOfDay(created_at) AS day,
    market_id,
    sum(volume) AS total_volume,
    count() AS total_trades,
    uniq(trader_id) AS unique_traders,
    avg(trade_size) AS avg_size
FROM trades
WHERE created_at >= today() - INTERVAL 7 DAY
GROUP BY day, market_id
ORDER BY day DESC, total_volume DESC;
```

## Data Insertion Patterns

### Bulk Insert (Recommended)

```typescript
// Batch insert (efficient)
async function bulkInsertTrades(trades: Trade[]) {
  const values = trades.map(trade => `(
    '${trade.id}', '${trade.market_id}', '${trade.user_id}',
    ${trade.amount}, '${trade.timestamp.toISOString()}'
  )`).join(',')

  await clickhouse.query(`
    INSERT INTO trades (id, market_id, user_id, amount, timestamp)
    VALUES ${values}
  `).toPromise()
}
```

## Materialized Views

```sql
CREATE MATERIALIZED VIEW market_stats_hourly_mv
TO market_stats_hourly
AS SELECT
    toStartOfHour(timestamp) AS hour,
    market_id,
    sumState(amount) AS total_volume,
    countState() AS total_trades,
    uniqState(user_id) AS unique_users
FROM trades
GROUP BY hour, market_id;
```

## Best Practices

### 1. Partitioning Strategy
- Partition by time (usually month or day)
- Avoid too many partitions (performance impact)

### 2. Ordering Key
- Put most frequently filtered columns first
- Consider cardinality (high cardinality first)

### 3. Data Types
- Use smallest appropriate type (UInt32 vs UInt64)
- Use LowCardinality for repeated strings
- Use Enum for categorical data

### 4. Avoid
- SELECT * (specify columns)
- FINAL (merge data before query instead)
- Too many JOINs (denormalize for analytics)
- Small frequent inserts (batch instead)

**Remember**: ClickHouse excels at analytical workloads. Design tables for your query patterns, batch inserts, and leverage materialized views for real-time aggregations.
