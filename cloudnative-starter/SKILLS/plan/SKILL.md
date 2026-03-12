---
name: plan
description: Restate requirements, assess risks, and create a step-by-step implementation plan. WAIT for user confirmation before touching any code.
user-invocable: true
---

# Plan

Create a comprehensive implementation plan before writing any code.

## What This Skill Does

1. **Restate Requirements** - Clarify what needs to be built
2. **Identify Risks** - Surface potential issues and blockers
3. **Create Step Plan** - Break down implementation into phases
4. **Wait for Confirmation** - MUST receive user approval before proceeding

## When to Use

- Starting a new feature
- Making significant architectural changes
- Working on complex refactoring
- Multiple files/components will be affected
- Requirements are unclear or ambiguous

## Pre-conditions

- A feature request, architectural change, or complex refactoring task has been described
- The codebase is accessible for analysis

## Workflow

1. **Analyze the request** and restate requirements in clear terms
2. **Break down into phases** with specific, actionable steps
3. **Identify dependencies** between components
4. **Assess risks** and potential blockers
5. **Estimate complexity** (High/Medium/Low)
6. **Present the plan** and WAIT for your explicit confirmation

## Plan Format

```markdown
# Implementation Plan: [Feature Name]

## Requirements Restatement
[Clear summary of what will be built]

## Implementation Phases

### Phase 1: [Phase Name]
- Step 1: [Specific action] (File: path/to/file)
- Step 2: [Specific action] (File: path/to/file)

### Phase 2: [Phase Name]
...

## Dependencies
[External services, packages, APIs needed]

## Risks
- HIGH: [Description and mitigation]
- MEDIUM: [Description and mitigation]

## Estimated Complexity
[HIGH/MEDIUM/LOW with time estimate]

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)
```

## Example Usage

```
User: I need to add real-time notifications when markets resolve

Agent (planner):
# Implementation Plan: Real-Time Market Resolution Notifications

## Requirements Restatement
- Send notifications to users when markets they're watching resolve
- Support multiple notification channels (in-app, email, webhook)
- Ensure notifications are delivered reliably
- Include market outcome and user's position result

## Implementation Phases

### Phase 1: Database Schema
- Add notifications table with columns: id, user_id, market_id, type, status, created_at
- Add user_notification_preferences table for channel preferences
- Create indexes on user_id and market_id for performance

### Phase 2: Notification Service
- Create notification service in lib/notifications.ts
- Implement notification queue using BullMQ/Redis
- Add retry logic for failed deliveries
- Create notification templates

### Phase 3: Integration Points
- Hook into market resolution logic (when status changes to "resolved")
- Query all users with positions in market
- Enqueue notifications for each user

### Phase 4: Frontend Components
- Create NotificationBell component in header
- Add NotificationList modal
- Implement real-time updates via subscriptions
- Add notification preferences page

## Dependencies
- Redis (for queue)
- Email service (SendGrid/Resend)
- Real-time subscriptions

## Risks
- HIGH: Email deliverability (SPF/DKIM required)
- MEDIUM: Performance with 1000+ users per market
- MEDIUM: Notification spam if markets resolve frequently
- LOW: Real-time subscription overhead

## Estimated Complexity: MEDIUM
- Backend: 4-6 hours
- Frontend: 3-4 hours
- Testing: 2-3 hours
- Total: 9-13 hours

**WAITING FOR CONFIRMATION**: Proceed with this plan? (yes/no/modify)
```

## Important Notes

**CRITICAL**: The agent will **NOT** write any code until you explicitly confirm the plan with "yes" or "proceed" or similar affirmative response.

If you want changes, respond with:
- "modify: [your changes]"
- "different approach: [alternative]"
- "skip phase 2 and do phase 3 first"

## Expected Inputs

- Description of what needs to be built or changed
- Any constraints or preferences

## Expected Outputs

- Detailed implementation plan with phases and steps
- Risk assessment
- Complexity estimate
- Clear request for user confirmation

## Success Criteria

- [ ] Requirements restated accurately
- [ ] All affected files/components identified
- [ ] Risks surfaced with mitigations
- [ ] Steps are specific and actionable (include file paths)
- [ ] User confirmed plan before any code is written

## Key Principle

**CRITICAL**: The plan must be confirmed by the user BEFORE any code is written. If the user wants changes, revise the plan. Never skip the confirmation step.
